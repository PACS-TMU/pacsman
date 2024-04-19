import { createClient } from '@/utils/supabase/server';
import { useState } from 'react';

export default async function PasswordsPage() {
    const Cryptr = require('cryptr');
    const cryptr = new Cryptr(process.env.ENCRYPTION_KEY!);
    const supabase = createClient();

    const { data: passwords } = await supabase.from("passwords").select();

    const encPasswords : string[] = [];

    passwords?.map((obj) => {
        const encPassword = cryptr.encrypt(obj.encrypted_password);
        encPasswords.push(encPassword);
    });

    console.log(encPasswords);

    const decPasswords : string[] = [];

    encPasswords.map((pass) => {
        const decPassword = cryptr.decrypt(pass);
        decPasswords.push(decPassword);
    })

    console.log(decPasswords);


    return (
        <div>
            {passwords?.map((password) => (
                <div key={password.id}>
                    <h2>{password.title}</h2>
                    <p>Unencrypted Password: {password.encrypted_password}</p>
                </div>
            ))}
        </div>
    )

}