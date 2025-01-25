import { Card, CardContent } from './ui/card';
import Image from "next/image";
import { benefits } from '@/lib/constansts';

const IconBoxes = () => {
  return (
    <section className='section'>
        <Card>
            <CardContent className="flex justify-between items-center gap-5 p-5">
                {benefits.map((item) => (
                    <div key={item.title}>
                        <Image className="mb-3" src={item.icon} width={25} height={45} alt='Shipping icon' aria-hidden='true' />
                        <h4 className="h4-bold">{item.title}</h4>
                        <p className="text-xs">{item.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>    
     </section>
  );
};

export default IconBoxes;