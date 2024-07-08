import LoginCard from './components/loginCard';
import LoginNavbar from './components/loginNavbar';
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
