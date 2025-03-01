import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PasswordService } from "../utils/password.service";
import {
  validateSignInUser,
  validateSignUpUser,
} from "../validation/auth.validator";
import { generateJwtToken } from "../utils/auth";
const prisma = new PrismaClient();

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = validateSignUpUser(req.body);
  if (error) {
    res.status(404).json({ msg: `${error.details[0].message}` });
    return;
  }

  const { firstName, lastName, userName, email, password } = req.body;

  const userExisting = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (userExisting) {
    res.status(400).json({ msg: "This user is already exist" });
    return;
  }

  if (!firstName || !lastName || !userName || !email || !password) {
    res.status(400).json({ msg: "All fields are required" });
    return;
  }

  const hashedPassword = await PasswordService.hashPassword(password);

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      userName,
      email,
      password: hashedPassword,
    },
  });

  res.status(200).json({
    msg: "user created successfully",
    user,
  });
};

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { error } = validateSignInUser(req.body);
  if (error) {
    res.status(404).json({ msg: `${error.details[0].message}` });
    return;
  }

  const { userName, email, password } = req.body;

  const userExisting = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userExisting) {
    res.status(400).json({ msg: "Invalid email or password" });
    return;
  }

  if (!userName || !email || !password) {
    res.status(401).json({ msg: "Are field are required" });
    return;
  }

  const matchPassword = await PasswordService.comaprePassword(
    password,
    userExisting.password
  );

  if (!matchPassword) {
    res.status(400).json({ msg: "Invalid email or password" });
    return;
  }

  const token = generateJwtToken({ id: userExisting.id });
  res.status(201).json({
    userExisting,
    token,
  });
};
