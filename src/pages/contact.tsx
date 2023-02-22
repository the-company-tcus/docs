import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import {
  Button,
  Center,
  Space,
  Stack,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core';
import Layout from '@theme/Layout';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

type FormType = z.infer<typeof formSchema>;

const ContactPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormType) => {
    setIsLoading(true);

    // TODO: Send email
    await new Promise((resolve) => {
      setTimeout(() => resolve(console.log('foo')), 5000);
    });

    setIsLoading(false);

    reset();
  };

  return (
    <Layout>
      <Center p="xl">
        <Stack>
          <Title align="center">Talk to our Team</Title>
          <Space h="lg" />
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack>
              <TextInput
                label="Your name"
                placeholder="John Doe"
                withAsterisk
                {...register('name')}
                disabled={isLoading}
                error={errors.name?.message as string}
                icon={<Icon icon="ic:outline-person" />}
              />
              <TextInput
                disabled={isLoading}
                icon={<Icon icon="ic:outline-alternate-email" />}
                label="Your email"
                placeholder="example@gmail.com"
                withAsterisk
                {...register('email')}
                error={errors.email?.message as string}
              />
              <Textarea
                disabled={isLoading}
                label="Message"
                withAsterisk
                {...register('message')}
                error={errors.message?.message as string}
              />
              <Space h="md" />
              <Button loading={isLoading} type="submit">
                Submit
              </Button>
            </Stack>
          </form>
        </Stack>
      </Center>
    </Layout>
  );
};

export default ContactPage;
