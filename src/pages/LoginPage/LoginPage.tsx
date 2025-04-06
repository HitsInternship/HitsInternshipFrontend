import { useStores } from "@shared/contexts";
import { observer } from "mobx-react-lite";
import { FC, useState } from "react";

export const LoginPage: FC = observer(() => {
  const {
    userStore: { userName, setUserName },
  } = useStores();

  const [newUserName, setNewUserName] = useState("");

  const handleChangeUserName = () => {
    setUserName(newUserName);

    setNewUserName("");
  };

  return (
    <>
      <div>типа логин</div>
      <div>userName: {userName}</div>
      <input
        type="text"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
        placeholder="Введите новое имя"
      />
      <button onClick={handleChangeUserName}>изменить</button>
    </>
  );
});
