import { Card, CardContent } from './ui/card';
import Image from "next/image";
import { benefits } from '@/lib/constansts';

const IconBoxes = () => {
  return (
    <section>
        <Card>
            <CardContent  className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:max-w-xl place-self-center justify-start p-5">
                {benefits.map((item) => (
                    <div key={item.title}>
                        <Image className="mb-3" src={item.icon} width={25} height={45} alt='Shipping icon' aria-hidden='true' />
                        <h3 className="h3-bold text-xs">{item.title}</h3>
                        <p className="text-xs">{item.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>    
     </section>
  );
};

export default IconBoxes;