import React from 'react';
import AppGrid from '@/components/AppGrid';
import InfoBlock from '@/components/InfoBlock';
import ButtonLink from '@/components/ButtonLink';
import Image from 'next/image';

export default function AboutPage() {
    return (
        <AppGrid
            contentMain={ <InfoBlock
                padding="tight"
                centered={true}
                animate={true}>
                    
                <div className='flex-inline mt-8'>
                    <h1 className='text-3xl'> Mili&apos;s About Page </h1>
                </div>

                <div className='flex flex-col  m-16'>
                    <div className='pt-16 px-16'>
                        <Image src="https://mili-img-bucket.s3.us-east-2.amazonaws.com/photo-4OjRZqPdC8kTix3I.jpeg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIA4MTWLALYYSO6L4JL%2F20250413%2Fus-east-2%2Fs3%2Faws4_request&X-Amz-Date=20250413T223752Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLWVhc3QtMiJHMEUCIQDi0a3t%2F%2BtbCTdNJEqclkd8AAtIz6swq5Pe5rw%2FcYKxXgIgdjeRaEhbmGkJGbmgYoR5gP7DQS37wr3Wj36CNLjTTHQq4wII%2BP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw4NTE3MjU0NTIwMTciDMEprayoio0xLeYjcCq3ArgYbSjLxekZdNk7WlKqpSYZJv2RCA%2F%2BA8%2Fw265w7M9bAfRkFd%2B3FyihN5j7sPQWi8Gt51Ueyc8NlsJxgkHSkwiMuLmkYHKY4Nbh1J3%2FTXRdvVBjW5xIhAyPgB1EoC51bWd9Zn84VY5HFiH5vI2X%2FyFBJTOzwT5t%2BJllfFcb%2BZktIrNtlTZVgzXRBDbtK4OaaZJjw9d%2B4Ju6s4oHl2dLDdky4KH%2FPA2LWxvpw7rRxckDJh3wpL9PGUJe8n3Ag98IPGQFJqAXUNuHL9oTuRdaG2NSmsF%2BnQ6N8rYFDUyIkAlVKk4QatNhsufBqOCwIELLy4h4O6c7QtHWcyUS55GdVSmnUMqTuPyAbQVbK%2F8CzOWO9tyjLJbV8AsaV0qrMSjZ1LcBt7PYpnTnc8AP2B3Fy5pVqQnbx68uMJT58L8GOq0CRHFNAT1r%2F0RKpQ9HdfI2Lzlqbbg6J9rJ5Kvd2XVr410ZbT3vJsikDTvXYdq%2Fm29QD6C6dyzIh481Y5MIgYiag%2BG8v5B5u1nkEmjyLBPV%2FO5w8TwiGlIixd%2FnYhfzrxXdPCOZRhFnjZVuK6nyNdVQ4YuFnpq3l07Vws%2Bocvhs%2FIchyUySsUKvXA7Rta%2BByNQeOSkhxIizn1%2BAzs%2BYX470eEKHFCH%2FPQIay1SVRKdKeGd2BZd9nc2e5d%2BMUDGYK4aC1xgl7yyZbfmG%2F6P%2FqXn402mvROE4%2BMJ%2FWbc%2FYltReHWXACuGpIjvQseMfqSDr2ZF0kKqaD9D3sZiFldy62WBFHxi0xrbZ%2Fk7Xiq7RWH1fSTWmquzcUzl3F%2B9%2BeKBexlc%2Be0gil5FaSfTfSt%2FrQ%3D%3D&X-Amz-Signature=c360100e70a108033a434b77293d86af41d3ba059ef0b1539d56baaaedd7d623&X-Amz-SignedHeaders=host&response-content-disposition=inline"
                            width={500}
                            height={500}
                            alt="Picture of author"
                            className='rounded-xl'>
                        </Image>
                    </div>
                    <div className="text-[128 px] flex flex-col space-y-4 py-16 px-8 items-center justify-center w-full">
                    ILLUSTRATION 
                    </div>

                </div>

                <div className="flex justify-center">
                    <ButtonLink label="Book Me" href="/book-me" />
                </div>
            </InfoBlock>
            }
        />
    );
}