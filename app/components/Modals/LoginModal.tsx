"use client";
import { signIn } from "next-auth/react";

import React, { useCallback } from "react";
import Modal from "./Modal";
import { toast } from "react-hot-toast";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useState } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import Heading from "../Heading";
import Input from "../Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import { useRouter } from "next/navigation";

const RegisterModal = () => {
  const router = useRouter();
  const { isOpen, onClose, onOpen } = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const toggle = useCallback(() => {
    onClose();
    registerModal.onOpen();
  }, [registerModal, onClose]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("Logged in successfully");
        router.refresh();
        onClose();
      }
      if (callback?.error) toast.error(callback.error);
    });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
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
        onClick={() => signIn("google")}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className=" text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center justify-center gap-2">
          <div className="">You dont have an account?</div>
          <div
            onClick={toggle}
            className="text-neutral-800 cursor-pointer hover:underline"
          >
            Sign Up
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
      title="Log In"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
