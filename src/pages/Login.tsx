
import Layout from "@/components/layout/Layout";
import LoginForm from "@/components/auth/LoginForm";

const Login = () => {
  return (
    <Layout>
      <div className="py-12 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Sign In to Your Account</h1>
        <LoginForm />
      </div>
    </Layout>
  );
};

export default Login;
