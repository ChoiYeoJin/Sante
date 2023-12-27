import { useEffect, useState } from 'react';
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

const URL = 'http://kdt-sw-7-team04.elicecoding.com/api/user';

interface FoodModalProps {
  modalButton: any;
  foodData: FoodList;
  foodId: string;
  modalType: ModalMode;
}

interface ModalFoodItem {
  id: string;
  name: string;
  calorie: number;
}

const FoodModal = ({ modalButton, foodData, foodId, modalType }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedValue, setSelectedValue] = useState('');
  const [foodItems, setFoodItems] = useState<ModalFoodItem[]>();
  console.log('fooddata', foodData);
  console.log('foodId', foodId);
  // input값 관리
  const [food, setFood] = useState('');
  const [calorie, setCalorie] = useState('');

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 추가
  const handleAddFoodItem = () => {
    // 새로운 음식 항목 생성
    const newFoodItem = {
      id: new Date().getTime(), // 고유한 id 생성
      name: null,
      calorie: null,
      foodCategory: selectedValue, // 새로운 항목의 foodCategory 추가
    };

    // foodItems 상태 업데이트
    setFoodItems((prevFoodItems) => [...prevFoodItems, newFoodItem]);
  };

  // 삭제
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

  // 각 음식 항목의 calorie 값 업데이트
  const handleCalorieChange = (value: string, index: number) => {
    const updatedFoodItems = [...foodItems];
    updatedFoodItems[index].calorie = Number(value);
    setFoodItems(updatedFoodItems);
  };

  useEffect(() => {
    const newFoodItems: ModalFoodItem[] = [];

    // FIXME - 반복문 null처리
    if (foodData !== null) {
      foodData.menu.forEach((item: Menu) => {
        newFoodItems.push({
          id:
            foodId.toString() +
            foodData.foodCategory +
            item.name +
            format(new Date(), 'yyyy-MM-dd-HH-mm-ss'),
          name: item.name,
          calorie: item.calory,
        });
      });
    }

    setFoodItems(newFoodItems);
  }, []);

  const handleEditClick = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      const newMenu: Menu[] | undefined = foodItems
        ?.map((item): Menu | undefined => {
          if (item.name !== null) {
            return {
              name: item.name,
              calory: item.calorie,
            };
          }
        })
        .filter((item): item is Menu => item !== undefined);

      // 업데이트할 데이터를 찾아 변경
      user.userFoodList?.forEach((food: Food) => {
        if (food.foodId === foodId) {
          food.foodList.forEach((item) => {
            if (item.foodCategory === foodData.foodCategory) {
              item.menu = newMenu ?? [];
            }
          });
        }
      });

      // 변경된 유저 그대로 업데이트
      console.log('user', JSON.stringify(user));

      // 서버에 변경 사항 업데이트
      await axios.put(`${URL}`, JSON.stringify(user), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Food Modal error', error);
    }
  };

  const handleSendDataToServer = async () => {
    try {
      const response = await axios.post(`${URL}/check`, {
        email: 'email@email.com',
        password: 'sdfdsf',
      });
      let user = removeIdField(response.data.user);
      delete user.__v;

      // ... 이전 코드 ...

      // 여기에 userFoodList 업데이트 로직 추가
      const newUserFoodList = user.userFoodList ? [...user.userFoodList] : [];

      // 이미 있는 foodCategory에 해당하는 배열이 있으면 추가
      const existingFoodIndex = newUserFoodList.findIndex(
        (item) => item.foodList[0].foodCategory === selectedValue
      );

      if (existingFoodIndex !== -1) {
        newUserFoodList[existingFoodIndex].foodList.push({
          foodCategory: selectedValue,
          totalCalory: foodItems.reduce(
            (total, foodItem) => total + parseInt(foodItem.calorie),
            0
          ),
          menu: foodItems.map((foodItem) => ({
            name: foodItem.food,
            calory: parseInt(foodItem.calorie),
          })),
        });
      } else {
        // 새로운 음식 항목 생성
        const newFoodList = foodItems.map((foodItem) => ({
          foodCategory: selectedValue,
          totalCalory: parseInt(foodItem.calorie),
          menu: [
            {
              name: foodItem.food,
              calory: parseInt(foodItem.calorie),
            },
          ],
        }));

        // 새로운 음식 항목을 추가
        newUserFoodList.push({
          foodList: newFoodList,
          foodId: new Date().getTime(),
          createdAt: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
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

  function removeIdField<T>(obj: T): T {
    if (Array.isArray(obj)) {
      // 배열인 경우 각 요소에 대해 재귀적으로 호출
      return obj.map((item) => removeIdField(item)) as unknown as T;
    } else if (obj !== null && typeof obj === 'object') {
      // 객체인 경우
      const newObj: any = { ...obj };
      delete newObj._id; // _id 필드 제거

      // 객체의 각 키에 대해 재귀적으로 호출
      Object.keys(newObj).forEach((key) => {
        newObj[key] = removeIdField(newObj[key]);
      });

      return newObj as T;
    }
    // 배열이나 객체가 아닌 경우 그대로 반환
    return obj;
  }

  const radioButtonInfo: InputButtonInfo = {
    type: 'circleRadio',
    size: 'short-oval',
    value: selectedValue,
    items: ['아침', '점심', '저녁', '간식'],
    backgroundColor: 'gray',
    color: 'white',
    fontWeight: 'bold',
    onChange: (selectedTime) => {
      console.log('선택된 값:', selectedTime);
      setSelectedValue(selectedTime);
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
              하루 권장 칼로리 1800Kcal
            </p>
          }
          modalButton={modalButton}
          onClick={closeModal}
          onClickCreate={() => {
            handleSendDataToServer();
            closeModal();
          }}
          onClickRemove={() => {
            console.log('삭제');
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
                  value={item.calorie}
                  onChange={(value) => handleCalorieChange(value, index)}
                  id={`calorie-${index}`}
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
