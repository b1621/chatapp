import { useAuth } from "../features/user/AuthContext";

const Register = () => {
  const { registerUser } = useAuth();

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Full Name</label>
          <input type="text" />
        </div>
      </form>
    </div>
  );
};

export default Register;
