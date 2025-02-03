import { Card, CardContent } from './ui/card';
import { benefits } from '@/lib/constansts';

const IconBoxes = () => {
  return (
    <section className='section'>
        <Card>
            <CardContent className="flex justify-between items-center gap-5 p-5">
                {benefits.map((item) => (
                    <div key={item.title} className='space-y-2'>
                        <item.icon className="w-5 h-5 text-primary" />
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