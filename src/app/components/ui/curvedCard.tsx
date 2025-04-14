import Image from 'next/image';

interface CardProps{
    src:string;
}

export default function CurvedCard({src}:CardProps) {
  return (
    <div className="flex flex-col items-center justify-center z-50">
      <div className="w-[90%] h-[90%] bg-white rounded-xl shadow-lg relative">
        <Image src={src} alt="Card" className="w-full h-full object-cover rounded-xl max-h-[400px]" fill />
      </div>
    </div>
  );
}