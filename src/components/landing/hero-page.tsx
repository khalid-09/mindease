import { MotionValue, useTransform } from 'framer-motion';
import HomeSection from './home-section';
import Navbar from './navbar';
import { motion } from 'framer-motion';

interface HeroPageProps {
  scrollYProgress: MotionValue<number>;
}

const HeroPage = ({ scrollYProgress }: HeroPageProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.div style={{ scale, rotate }} className="sticky top-0">
      <Navbar />
      <HomeSection />
    </motion.div>
  );
};

export default HeroPage;
