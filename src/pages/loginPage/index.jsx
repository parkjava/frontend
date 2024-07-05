import LoginNavbar from './components/loginNavbar';
import LoginCard from './components/loginCard';
import LoginTitle from './components/loginTitle';

function LoginPage() {
  return (
    <>
      <div>
        <LoginNavbar />
        <LoginTitle />
        <LoginCard/>
      </div>
    </>
  );
}

export default LoginPage;
