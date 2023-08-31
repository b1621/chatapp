import { useAuth } from "../features/user/AuthContext";

const Profile = ({ setShowAddGroup }) => {
  //   const { user, dispatch } = useAuth();

  //   const { email, name, pic } = user;
  //   console.log(email, name, pic);
  //   const logout = () => {
  //     dispatch({ type: "user/logout" });
  //   };

  return (
    <div className="absolute flex h-screen w-screen  justify-center  backdrop-blur-sm backdrop-brightness-100">
      <div className=" relative mt-36 h-fit w-96 bg-slate-700">
        <button
          className="absolute right-3 text-3xl hover:text-slate-300"
          onClick={() => setShowAddGroup(false)}
        >
          &times;
        </button>

        <div className="mx-auto my-5 w-fit space-y-4 text-center text-lg">
          <input type="text" />
          <button>Add Group</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
