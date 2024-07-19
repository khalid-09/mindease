import Image from 'next/image';
import img1 from '../../../public/chart1.png';
import img2 from '../../../public/chart2.png';
import img3 from '../../../public/chart3.png';

const cards = [
  {
    img: img1,
    text: 'Mental Burnout Probability level',
    desc: 'You could be closer to a mental burnout than you realize. The report will help you understand it and solve it before it becomes a problem',
  },
  {
    img: img2,
    text: 'The #1 mental exhaustion trigger',
    desc: 'You could be closer to a mental burnout than you realize. The report will help you understand it and solve it before it becomes a problem',
  },
  {
    img: img3,
    text: 'Anxiety & overthinking score',
    desc: 'You could be closer to a mental burnout than you realize. The report will help you understand it and solve it before it becomes a problem',
  },
];

const ReportSection = () => {
  return (
    <section className="mt-40 space-y-8">
      <h3 className="font-bold text-center text-[2.5rem]">
        Get a <span className="text-[#109e96]">free</span> report
      </h3>
      <div className="flex justify-center ">
        <p className="h-[5.063rem] text-center w-[33.313rem]">
          When you complete the quiz, you will get a free report with scores
          that will help you better understand how you&apos;ve been feeling
          recently.
        </p>
      </div>
      <div className="items-center justify-center gap-16 flex">
        {cards.map((card, i) => (
          <div key={i} className="flex items-center gap-6 flex-col">
            <div className="relative w-[17.625rem] h-[10.25rem]">
              <Image
                src={card.img}
                alt="Img"
                fill
                className="object-cover absolute"
              />
            </div>
            <p className="text-[#00B1A7] font-bold w-[21.063rem] text-center text-[1.625rem]">
              {card.text}
            </p>
            <p className="w-[21.063rem] text-center h-[6.75rem]">{card.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ReportSection;
