import React from 'react';
import AppGrid from '@/components/AppGrid';
import InfoBlock from '@/components/InfoBlock';

export default function BookMePage() {
    return (
        <AppGrid
            contentMain={ <InfoBlock
                padding="tight"
                centered={true}
                animate={true}>

                <div className='flex-inline mt-8'>
                    <h1 className='text-3xl'> Book Me </h1>
                </div>

                <div className='flex flex-row m-16'>
                    <div className="text-base flex flex-col space-y-4 py-16 px-8 items-center justify-center w-full">
                        <p>
                            Select a date and time from the calendar below to book an appointment.
                        </p>
                        {/* Placeholder for Calendar Component */}
                        <div className="w-full border rounded-lg p-4">
                            <p className="text-center text-gray-500">[Calendar Component Placeholder]</p>
                        </div>
                    </div>
                </div>
            </InfoBlock>
            }
        />
    );
}
