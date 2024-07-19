import Image from 'next/image';
import logoImg from '../../../public/logo.png';
const Logo = () => {
  return (
    <div className="h-[4.554rem] w-[14.081rem] relative">
      <Image
        src={logoImg}
        alt="Logo Img"
        fill
        className="absolute object-cover"
        placeholder="blur"
      />
    </div>
  );
};

export default Logo;
