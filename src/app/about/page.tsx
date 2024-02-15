import SiteGrid from '@/components/SiteGrid';
import InfoBlock from '@/components/InfoBlock';
import Image from 'next/image';

export default async function AboutPage() {
    return (
        <SiteGrid
            contentMain={<InfoBlock
                padding="tight"
                centered={true}
            >
                <div className='flex-inline mt-8'>
                    <h1 className='text-3xl'> Mili's About Page </h1>
                </div>

                <div className='flex flex-row m-16'>
                    <div className='pt-16'>
                        <Image src="https://milli-img-bucket.s3.us-east-2.amazonaws.com/IMG_5724.JPG"
                            width={500}
                            height={500}
                            alt="Picture of author"
                            className='rounded-xl'>
                        </Image>
                    </div>
                    <div className="text-base flex flex-col space-y-4 py-16 px-8 items-center justify-center w-full">
                        HLorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vel erat nulla. Proin massa mauris, suscipit in leo in, viverra pretium sem. Nullam sapien lorem, aliquet et vulputate sed, venenatis nec tortor. Aliquam sollicitudin sem urna. Praesent pharetra elementum facilisis. Praesent rhoncus id leo a commodo. Fusce sit amet velit ut ligula pharetra elementum at molestie lectus. Fusce sed risus eu leo lobortis dapibus. Vestibulum pellentesque mauris sed tempus vulputate. Sed vel congue enim. Pellentesque ligula nibh, mollis id metus sed, sodales scelerisque ante. Suspendisse pretium nibh vel sapien feugiat feugiat. Aenean in viverra odio. Nullam felis tellus, semper ut erat eu, eleifend feugiat ipsum. Nam condimentum augue eu tempus gravida.

                        Nam tempus leo nec iaculis pretium. Proin libero nulla, feugiat eget mattis non, iaculis sit amet mi. Nulla nec pulvinar ex. Phasellus dignissim dolor a augue malesuada tincidunt. Mauris eu commodo ligula, id placerat libero. Vivamus ac imperdiet lacus. Donec placerat egestas ante, non consequat eros viverra consequat. Suspendisse id ligula tincidunt, euismod orci vel, luctus lacus. Praesent placerat turpis tellus, non pharetra nunc molestie id. Vestibulum commodo leo erat, imperdiet posuere arcu venenatis et. Ut aliquet risus non justo tristique varius. Nullam nec pharetra arcu.
                    </div>
                </div>
            </InfoBlock>}
        />
    );
}