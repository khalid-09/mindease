import Link from 'next/link';
import Logo from './logo';

const Navbar = () => {
  return (
    <header className=" h-[6.304rem] p-4">
      <main className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo />
        <ul className="hidden gap-11 md:flex font-bold text-xl">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/signup">Sign up</Link>
          </li>
        </ul>
      </main>
    </header>
  );
};

export default Navbar;
