import Logo from './logo';

const Navbar = () => {
  return (
    <header className=" h-[6.304rem] p-4">
      <main className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <ul className="flex gap-11">
          <li>Home</li>
          <li>Community</li>
          <li>SignUp</li>
          <li>Login</li>
        </ul>
      </main>
    </header>
  );
};

export default Navbar;
