"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import React from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useCallback, useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import Heading from "../Heading";
import Input from "../Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useRegisterModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggle = useCallback(() => {
    onClose();
    loginModal.onOpen();
  }, [loginModal, onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        onClose();
        signIn("credentials", {
          redirect: false,
          callbackUrl: "/",
          email: data.email,
          password: data.password,
        }).then(() => router.refresh());
        toast.success("Successfully!");
      })
      .catch((err) => {
        let msg = err.message ?? "Something went wrong";
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Aribnb" subtitle="Create an account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="">Already have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Log In
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      body={bodyContent}
      footer={footerContent}
      disabled={isLoading}
      isOpen={isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
