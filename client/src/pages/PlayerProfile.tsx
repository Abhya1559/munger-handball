// import { useContext, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// // import { useNavigate } from "react-router-dom";
// import { updateById } from "../services/playerServices";
// import { updateSchema } from "../utils/schema";
// import type z from "zod";
// import { Button } from "../components/ui/button";
// import { Input } from "../components/ui/input";
// import { Label } from "@radix-ui/react-label";
// import { Spinner } from "../components/ui/spinner";
// import * as React from "react";

import { useEffect, useState } from "react";
import { getPlayer } from "../services/playerServices";
import { email } from "zod";

// type UpdateErrors = z.inferFlattenedErrors<typeof updateSchema>["fieldErrors"];
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   age: number;
//   gender?: string;
//   position: string;
// }

// export default function PlayerProfile() {
//   // const navigate = useNavigate();
//   const { user, setUser } = useContext(AuthContext);
//   if (!user) {
//     return <div>Login first</div>;
//   }
//   const [form, setForm] = useState<FormData>({
//     name: user.name,
//     email: user.email,
//     phone: user.phone ?? "",
//     age: user.age ?? 0,
//     gender: user.gender ?? "",
//     position: user.position ?? "",
//   });
//   const [loading, setLoading] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const [error, setError] = useState<UpdateErrors>({});

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const updatePlayer = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     const result = updateSchema.safeParse(form);
//     if (!result.success) {
//       setError(result.error.flatten().fieldErrors);
//       setLoading(false);
//       return;
//     }
//     setError({});
//     try {
//       const res = await updateById({ id: user.id, updatedData: result.data });
//       setUser(res.user);
//       setEdit(false);
//     } catch (error: any) {
//       console.error("update server error", error);
//       alert(error.response?.data?.message || "profile update failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div>
//       <h1>{user.name}</h1>
//       {edit ? (
//         <form onSubmit={updatePlayer}>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Name</Label>
//               <Input
//                 id="name"
//                 type="text"
//                 placeholder="Enter your name..."
//                 onChange={handleChange}
//                 name="name"
//                 value={form.name}
//                 required
//               />
//               <p className="text-red-500 text-sm">{error.name}</p>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="m@example.com"
//                 required
//               />
//               <p className="text-red-500 text-sm">{error.email}</p>
//             </div>
//             <div className="flex justify-between items-center w-full gap-2">
//               <div className="w-full">
//                 <Label htmlFor="age">Age</Label>
//                 <Input
//                   id="age"
//                   type="number"
//                   onChange={handleChange}
//                   name="age"
//                   value={form.age}
//                   placeholder="0"
//                   className="mt-2 w-full border shadow"
//                 />
//                 <p className="text-red-500 text-sm">{error.age}</p>
//               </div>
//               <div className="w-full">
//                 {" "}
//                 <Label htmlFor="Gender">Gender</Label>
//                 <select
//                   name="gender"
//                   id="gender"
//                   onChange={handleChange}
//                   value={form.gender}
//                   className="border p-2 rounded-md mt-2 w-full shadow"
//                 >
//                   <option value="" disabled hidden>
//                     Gender
//                   </option>
//                   <option value="male">Male</option>
//                   <option value="female">Female</option>
//                 </select>
//                 <p className="text-red-500 text-sm">{error.gender}</p>
//               </div>
//             </div>
//             <div className="flex justify-between items-center w-full gap-2">
//               <div className="w-full">
//                 <Label htmlFor="phone">Phone number</Label>
//                 <Input
//                   id="phone"
//                   type="tel"
//                   name="phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   placeholder="Enter your number"
//                   className="mt-2 w-full border shadow"
//                 />
//                 <p className="text-red-500 text-sm">{error.phone}</p>
//               </div>
//               <div className="w-full">
//                 {" "}
//                 <Label htmlFor="position">Position</Label>
//                 <select
//                   name="position"
//                   id="position"
//                   onChange={handleChange}
//                   value={form.position}
//                   className="border p-2 rounded-md mt-2 w-full shadow"
//                 >
//                   <option value="" disabled hidden>
//                     Position
//                   </option>
//                   <option value="left-wing">Left Wing</option>
//                   <option value="right-wing">Right Wing</option>
//                   <option value="center">Center</option>
//                   <option value="right-forward">Right Forward</option>
//                   <option value="left-forward">Left Forward</option>
//                   <option value="pivot">Pivot Player</option>
//                   <option value="goalkeeper">Goalkeeper</option>
//                 </select>
//                 <p className="text-red-500 text-sm">{error.position}</p>
//               </div>
//             </div>
//           </div>
//           <Button type="submit" className="w-full cursor-pointer mt-5 ">
//             {loading ? <Spinner /> : <h1>Save Changes</h1>}
//           </Button>
//           <Button onClick={() => setEdit(false)} variant={"destructive"}>
//             Cancel
//           </Button>
//         </form>
//       ) : (
//         <div className="flex flex-col items-start gap-2 p-6">
//           <p>
//             <strong>Name:</strong> {user.name}
//           </p>
//           <p>
//             <strong>Email:</strong> {user.email}
//           </p>
//           <p>
//             <strong>Age:</strong> {user.age}
//           </p>
//           <p>
//             <strong>Gender:</strong> {user.gender}
//           </p>
//           <p>
//             <strong>Phone:</strong> {user.phone}
//           </p>
//           <p>
//             <strong>Position:</strong> {user.position}
//           </p>

//           <Button onClick={() => setEdit(true)}>Update</Button>
//         </div>
//       )}
//     </div>
//   );
// }
// interface FormData {
//   name: string;
//   email: string;
//   phone: string;
//   age: number;
//   gender?: string;
//   position: string;
// }
interface Player {
  id: number;
  name: string;
  email: string;
  phone?: string;
  age?: number;
  gender?: string;
  position?: string;
}
export default function PlayerProfile() {
  const [player, setPlayer] = useState<Player | null>(null);
  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const playerData = await getPlayer(1);
        // console.log(playerData);
        setPlayer(playerData.player);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayerData();
  }, []);
  if (!player) {
    return (
      <div>
        <h1>....loading</h1>
      </div>
    );
  }
  return (
    <div>
      <h2>Player Profile</h2>
      <ul>
        <li>Name: {player.name}</li>
        <li>Email: {player.email}</li>
        <li>Phone: {player.phone}</li>
        <li>Age: {player.age}</li>
        <li>Gender: {player.gender}</li>
        <li>Position: {player.position}</li>
      </ul>
    </div>
  );
}
