import { SetStateAction, useEffect, useState } from 'react';
import ModalCard from '../../components/modals/ModalCard';
import Input from '../../components/Input';
import Remove from '../icons/Remove';
import { RadioButton, InputButtonInfo } from '../RadioButton';
import {
  DynamicButton,
  DynamicButtonInfo,
} from '../../components/DynamicButton';
import styled from 'styled-components';
import axios from 'axios';
import { format } from 'date-fns';
import { Food, FoodList, Menu } from '../../types/user';
import { ModalMode } from '../../types/modalMode';
import { getEmail, getPassword } from '../../utils/WebStorageControl';

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface FoodModalProps {
  modalButton: any;
  foodData?: FoodList | null;
  foodId?: string | null; // 날짜
  modalType: ModalMode;
  name?: string; // 음식이름
}

interface ModalFoodItem {
  id: number | string;
  name: string;
  calory: number | string;
  totalCalory?: number | string;
}

const FoodModal = ({ modalButton, foodData, foodId }: FoodModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState(''); // 카테고리저장을 위한
  const [foodItems, setFoodItems] = useState<ModalFoodItem[]>([]);
  console.log('fooddata', foodData);
  console.log('해당식단카테고리', foodData?.foodCategory);
  const selectedCategory = foodData?.foodCategory;
  console.log('selectedCategory', selectedCategory);
  // const [selectedFoodCategory, setSelectedFoodCategory] = useState('');  //카테고리표시를위한
  console.log('selectedCategory', selectedCategory);
  const [userCalory, setUserCalory] = useState();

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 추가 생성
  const handleAddFoodItem = () => {
    const newFoodItem = {
      id: new Date().getTime(), // 고유한 id 생성
      name: '',
      calory: '',
      foodCategory: {
        value: selectedValue,
        category: selectedCategory,
      },
      totalCalory: '',
    };

    // foodItems 상태 업데이트
    setFoodItems([...foodItems, newFoodItem]);
  };

  // 삭제(단일 음식)
  const handleRemoveFoodItem = (index: number) => {
    const filteredItem = [...foodItems];
    filteredItem.splice(index, 1);
    setFoodItems(filteredItem);
  };

  // 각 음식 항목의 food 값 업데이트
  const handleFoodChange = (value: string, index: number) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].name = value;
    setFoodItems(updatedFoodItems);
  };

  // 각 음식 항목의 calory 값 업데이트
  const handleCaloryChange = (value: string, index: number) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].calory = Number(value);
    setFoodItems(updatedFoodItems);
  };

  useEffect(() => {
    axios
      .post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      })
      .then((response) => {
        const userData = response.data.user;
        console.log('userData', userData);
        const userCalory = userData.todayCalory;
        setUserCalory(userCalory);
        console.log('userCalory', userCalory);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  useEffect(() => {
    const newFoodItems: ModalFoodItem[] = [];

    // FIXME - 반복문 null처리
    if (foodData !== null) {
      foodData?.menu.forEach((item: Menu) => {
        return newFoodItems.push({
          id:
            foodId?.toString() +
            foodData.foodCategory +
            item.name +
            format(new Date(), 'yyyy-MM-dd-HH-mm-ss'),
          name: item.name,
          calory: item.calory,
        });
      });
    }

    setFoodItems(newFoodItems);
  }, []);

  // 식단 데이터 생성
  const handleSendDataToServer = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      let user = removeIdField(response.data.user);
      delete user.__v;
      // 총 칼로리 계산
      const totalFoodCalory = foodItems.reduce(
        (total, foodItem) => total + Number(foodItem.calory),
        0
      );
      console.log('totalFoodCalory', totalFoodCalory);

      const newUserFoodList = user.userFoodList ? [...user.userFoodList] : [];

      console.log(foodId);

      //새로 추가한 부분
      // const updatedUserFoodList = user.userFoodList.map((item: Food) => {
      //   if (item.foodId === foodId) {
      //     // foodId가 일치하는 경우 foodList 업데이트
      //     return {
      //       ...item,
      //       foodList: [
      //         ...item.foodList,
      //         {
      //           foodCategory: selectedValue,
      //           totalCalory: totalFoodCalory,
      //           menu: foodItems.map((foodItem) => ({
      //             name: foodItem.name,
      //             calory: foodItem.calory,
      //           })),
      //         },
      //       ],
      //     };
      //   } else {
      //     // foodId가 일치하지 않는 경우 현재 요소 반환
      //     return item;
      //   }
      // });

      // // 새 Food 객체 추가 필요 여부 확인
      // const foodExists = user.userFoodList.some(
      //   (item: Food) => item.foodId === foodId
      // );
      // if (!foodExists) {
      //   updatedUserFoodList.push({
      //     foodId: foodId?.toString() ?? '',
      //     lastUpdated: new Date(),
      //     createdAt: new Date(),
      //     foodList: [
      //       {
      //         foodCategory: selectedValue,
      //         totalCalory: totalFoodCalory,
      //         menu: foodItems.map((foodItem) => ({
      //           name: foodItem.name,
      //           calory: foodItem.calory,
      //         })),
      //       },
      //     ],
      //   });
      // }

      // // user.userFoodList 업데이트
      // user.userFoodList = updatedUserFoodList;

      // console.log(user);

      //원래 있던 부분
      const existingFoodIndex = newUserFoodList.findIndex((item) => {
        return (
          item.foodList.length > 0 &&
          item.foodList[0].foodCategory === selectedValue
        );
      });

      // 존재하는 foodCategory 찾은 경우
      if (existingFoodIndex !== -1) {
        // 기존 객체 복사
        const existingFood = { ...newUserFoodList[existingFoodIndex] };
        const existingMenu = [...existingFood.foodList[0].menu]; // 메뉴 배열 복사

        // 메뉴에 foodItem이 이미 존재하는지 확인
        const existingMenuItemIndex = existingMenu.findIndex(
          (menu) => menu.name === foodItems[0].name
        );

        // 기존 메뉴 항목 업데이트 또는 새로운 메뉴 항목 추가
        if (existingMenuItemIndex !== -1) {
          existingMenu[existingMenuItemIndex] = {
            ...existingMenu[existingMenuItemIndex],
            calory:
              existingMenu[existingMenuItemIndex].calory + totalFoodCalory,
          };
        } else {
          existingMenu.push(...foodItems);
          existingFood.foodList[0].totalCalory += totalFoodCalory;
        }

        existingFood.foodList[0].menu = existingMenu;
        newUserFoodList[existingFoodIndex] = existingFood;
      } else {
        // 새로운 음식 항목 생성 및 추가
        newUserFoodList.push({
          foodList: [
            {
              foodCategory: selectedValue,
              totalCalory: totalFoodCalory,
              menu: foodItems,
            },
          ],
          foodId: foodId,
          createdAt: new Date(),
          lastUpdated: new Date(),
        });
      }

      user.userFoodList = newUserFoodList;

      // 변경된 유저 그대로 업데이트
      console.log('user', user);

      await axios.put(`${URL}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const handleEditClick = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      const newMenu: Menu[] | undefined = foodItems
        ?.map((item): Menu | undefined => {
          if (item.name !== null) {
            return {
              name: item.name,
              calory: item.calory,
            };
          }
        })
        .filter((item): item is Menu => item !== undefined);

      user.userFoodList?.forEach((food: Food) => {
        if (food.foodId === foodId) {
          food.foodList.forEach(
            (item: { foodCategory: string | undefined; menu: Menu[] }) => {
              if (item.foodCategory === foodData?.foodCategory) {
                item.menu = newMenu ?? [];
              }
            }
          );
        }
      });

      console.log('user', JSON.stringify(user));

      await axios.put(`${URL}`, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Food Modal error', error);
    }
  };

  // 삭제
  const handleDeleteClick = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: getEmail(),
        password: getPassword(),
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      // 삭제할 음식 항목 찾기
      const updatedUserFoodList = (user.userFoodList || []).map(
        (food: {
          foodId: string | null | undefined;
          foodList: { foodCategory: string | undefined; menu: any[] }[];
        }) => {
          if (food.foodId === foodId) {
            // 찾은 음식 항목의 foodList에서 특정 조건에 맞는 항목을 제외
            food.foodList = food.foodList.filter(
              (item: { foodCategory: string | undefined; menu: any[] }) => {
                return item.foodCategory !== foodData?.foodCategory;
              }
            );
          }
          return food;
        }
      );

      user.userFoodList = updatedUserFoodList;

      console.log('user', user);

      const putResponse = await axios.put(`${URL}`, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (putResponse.status === 200) {
        console.log('PUT 요청이 성공적으로 완료되었습니다.');
      } else {
        console.error(
          'PUT 요청이 실패했습니다. HTTP 상태 코드:',
          putResponse.status
        );
      }

      closeModal();
      //TODO - 페이지 새로고침되야 보이는데 새로고침을 작성해줄지?
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  function removeIdField<T>(obj: T): T {
    if (Array.isArray(obj)) {
      return obj.map((item) => removeIdField(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
      // 객체인 경우
      const newObj: any = { ...obj };
      delete newObj._id; // _id 필드 제거

      Object.keys(newObj).forEach((key) => {
        newObj[key] = removeIdField(newObj[key]);
      });

      return newObj as T;
    }
    return obj;
  }

  // selectedValue
  // selectedCategory
  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['아침', '점심', '저녁', '간식'],
    //category: selectedFoodCategory,
    // category: '아침',
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onChange: (selectedTime: SetStateAction<string>) => {
      console.log('선택된 값:', selectedTime);
      setSelectedValue(selectedTime);
      // setSelectedFoodCategory(selectedTime);
    },
  };

  const buttonInfo: DynamicButtonInfo = {
    type: 'text',
    size: 'small',
    text: '+식단추가',
    color: 'orange',
    fontWeight: 'bold',
    onClick: () => {
      handleAddFoodItem();
    },
  };

  return (
    <>
      {isModalOpen && (
        <ModalCard
          modalTitle="🍚식단"
          inputElement={
            <p
              style={{
                fontSize: '15px',
                marginLeft: '40px',
                fontWeight: 'bold',
              }}
            >
              하루 권장 칼로리 {userCalory}Kcal
            </p>
          }
          modalButton={modalButton}
          onClick={() => {
            closeModal();
          }}
          onClickCreate={() => {
            handleSendDataToServer();
            closeModal();
          }}
          onClickRemove={() => {
            handleDeleteClick();
          }}
          onClickUpdate={() => {
            handleEditClick();
          }}
        >
          <div style={{ marginLeft: '10%' }}>
            <RadioButton info={radioButtonInfo} />
          </div>

          <ScrollBarDiv>
            {foodItems?.map((item, index) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  columnGap: '5px',
                  margin: '0px 10px',
                }}
              >
                <div onClick={() => handleRemoveFoodItem(index)}>
                  <Remove />
                </div>
                <Input
                  type="text"
                  placeholder={'음식 이름'}
                  width="50%"
                  height="35px"
                  value={item.name}
                  onChange={(value) => handleFoodChange(value, index)}
                  id={`food-${index}`}
                />
                <Input
                  type="number"
                  placeholder={'칼로리'}
                  width="30%"
                  height="35px"
                  value={item.calory}
                  onChange={(value) => handleCaloryChange(value, index)}
                  id={`calory-${index}`}
                />
                <p style={{ fontSize: '15px' }}>Kcal</p>
              </div>
            ))}
          </ScrollBarDiv>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '10px',
            }}
          >
            <DynamicButton info={buttonInfo} />
          </div>
        </ModalCard>
      )}
    </>
  );
};

const ScrollBarDiv = styled.div`
  margin-bottom: 10px;
  margin-right: 5px;
  overflow-y: auto;
  max-height: 160px;
  &::-webkit-scrollbar {
    width: 10px; // Chrome 및 Safari에서 스크롤 너비 조절
  }
  &::-webkit-scrollbar-thumb {
    height: 5px;
    border-radius: 10px;
    background-color: var(--primary-color);
  }
  &::-webkit-scrollbar-track {
    border: 1px solid var(--gray-light);
    border-radius: 10px;
    background-color: none;
  }
`;

export default FoodModal;
