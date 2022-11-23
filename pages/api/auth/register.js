import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../../../../my-auth/lib/auth';
import validator from 'validator';

const prisma = new PrismaClient();

async function handler(req, res) {
    if (req.method === 'POST') {
        const input = req.body;

        if (validator.isEmpty(input.company_name)) {
            return res.status(422).json({ message: 'Sorry! Company name is required.' });
        }
        if (validator.isEmpty(input.first_name)) {
            return res.status(422).json({ message: 'Sorry! Contact first name is required.' });
        }
        if (validator.isEmpty(input.last_name)) {
            return res.status(422).json({ message: 'Sorry! Contact last name is required.' });
        }

        if (!validator.isEmail(input.email)) {
            return res.status(422).json({ message: 'Invalid email address entry!' });
        }

        const existingCompany = await prisma.user.findUnique({
            where: {
                email: input.email
            }
        });

        if (existingCompany) {
           return res.status(422).json({ message: 'This company already exists!' });
        }

        if (input.password.length < 3) {
            return res.status(422).json({ message: 'Password must be atleast 3 characters long' });
        }

        if (input.password != input.confirm_password) {
            return res.status(422).json({ message: "Passwords do not match!" });
        }

        const hashedPassword = await hashPassword(input.password);

        const result = await prisma.user.create({
            data: {
                first_name: input.first_name,
                last_name: input.last_name,
                email: input.email,
                password: hashedPassword,
                companies: {
                    create: [
                        {
                            company_name: input.company_name,
                            year_incorporated: new Date(input.year_incorporated),
                        }
                    ]
                }
            }
        });

        return res.status(201).json(result);

    }
}

export default handler;