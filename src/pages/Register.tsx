
import Layout from "@/components/layout/Layout";
import RegisterForm from "@/components/auth/RegisterForm";

const Register = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Create a New Account</h1>
        <RegisterForm />
      </div>
    </Layout>
  );
};

export default Register;
