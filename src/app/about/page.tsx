import SiteGrid from '@/components/SiteGrid';
import InfoBlock from '@/components/InfoBlock';
import Image from 'next/image';


export default async function AboutPage() {


    return (
        <SiteGrid
            contentMain={<InfoBlock
                padding="tight"
                centered={false}
            >
                <div className="text-base flex flex-col space-y-4 p-2 items-center justify-center w-full">
                    Hey bby
                </div>
                <div>
                    <Image src="https://milli-img-bucket.s3.us-east-2.amazonaws.com/IMG_5724.JPG"
                        width={250}
                        height={250}
                        alt="Picture of author"
                        className='rounded-xl'>
                    </Image>
                </div>
                Weeeee
            </InfoBlock>}
        />
    );
}