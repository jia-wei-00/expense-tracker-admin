import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { observer } from "mobx-react-lite";
import * as z from "zod";
import { authStore } from "../../store";
import { TextField } from "@mui/material";

const Login: React.FC = () => {
  const schema = z
    .object({
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .max(30)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).*$/,
          "Password must contain at least one lowercase letter, one uppercase letter, one symbol, and one digit"
        ),
      repeat_pwd: z.string().optional(),
    })
    .refine(
      (data) => {
        if (data.repeat_pwd !== undefined && data.repeat_pwd !== "") {
          return data.password === data.repeat_pwd;
        }
        return true;
      },
      {
        path: ["repeat_pwd"],
        message: "Password do not match",
      }
    );

  const { register, handleSubmit } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(authStore.signIn)}
      className="login-form testing"
    >
      <TextField id="filled-basic" label="Filled" variant="filled" />
    </form>
  );
};

export default observer(Login);
