import Image from 'next/image';
import logo from '../../../public/logo.png';
import {
  GitHubLogoIcon,
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

const Footer = () => {
  return (
    <div className="bg-[#109E96] mt-40 p-20 flex items-center justify-between">
      <div className="space-x-3">
        <div className="relative h-[6.313rem] w-[19.509rem]">
          <Image src={logo} alt="Logo" fill className="object-cover absolute" />
        </div>
        <div className="flex gap-2">
          <GitHubLogoIcon className="h-6 w-6" />
          <InstagramLogoIcon className="h-6 w-6" />
          <LinkedInLogoIcon className="h-6 w-6" />
          <TwitterLogoIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex gap-20">
        <ul className="space-y-3">
          <li className="font-bold text-lg">Our Story</li>
          <li>FAQ</li>
          <li>Contact</li>
        </ul>
        <ul className="space-y-3">
          <li className="font-bold text-lg">Service</li>
          <li>Try Quiz</li>
          <li>Community Forum</li>
        </ul>
        <ul className="space-y-3">
          <li className="font-bold text-lg">About us</li>
          <li>Developers</li>
          <li>Meet our teams</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
