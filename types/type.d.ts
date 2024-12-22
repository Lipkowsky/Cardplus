import mongoose from "mongoose";
declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}
declare interface User {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  clerkId: string;
  createdAt: string;
  // Add other fields as necessary
}

// Define the interface for the participant
interface Participant {
  userId: mongoose.Types.ObjectId; // Reference to the User model
  accessGrantedAt: Date; // Date when access was granted
}

// Define the interface for the List item
export interface ListItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  addedAt: Date;
  createdBy: User;
  quantity: number;
}

// Define the main List interface
export interface List {
  _id: mongoose.Types.ObjectId;
  title: string; // Title of the list
  createdAt: Date; // Date the list was created
  createdBy: mongoose.Types.ObjectId; // Reference to the User model who created the list
  participants: Participant[]; // Array of participants
  items: ListItem[]; // Array of ListItem references
}
