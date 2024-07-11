// /** @format */

// import React, { useState } from "react";
// import {
//   Container,
//   TextField,
//   Checkbox,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Paper,
//   Modal,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import DeleteIcon from "@mui/icons-material/Delete";

// const ParentComponent = () => {
//   const [data, setData] = useState([]);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [modalPath, setModalPath] = useState([]);
//   const [modalText, setModalText] = useState("");
//   const [modalHasComment, setModalHasComment] = useState(false);

//   const handleTextChange = (path, value) => {
//     const newData = [...data];
//     let current = newData;

//     path.forEach((p, i) => {
//       if (i === path.length - 1) {
//         current[p].text = value;
//       } else {
//         current = current[p].options;
//       }
//     });

//     setData(newData);
//     console.log("Updated Data:", newData);
//   };

//   const handleCheckboxChange = (path, checked) => {
//     const newData = [...data];
//     let current = newData;

//     path.forEach((p, i) => {
//       if (i === path.length - 1) {
//         current[p].has_comment = checked;
//       } else {
//         current = current[p].options;
//       }
//     });

//     setData(newData);
//     console.log("Updated Data:", newData);
//   };

//   const addSubItem = (path) => {
//     const newData = [...data];
//     let current = newData;

//     path.forEach((p, i) => {
//       if (i === path.length - 1) {
//         current[p].options.push({
//           id: Date.now(),
//           text: "",
//           has_comment: false,
//           options: [],
//         });
//       } else {
//         current = current[p].options;
//       }
//     });

//     setData(newData);
//     console.log("Added Sub Item:", newData);
//   };

//   const addPrimaryDropdown = () => {
//     setData([
//       ...data,
//       { id: Date.now(), text: "", has_comment: false, options: [] },
//     ]);
//     console.log("Added Primary Dropdown:", data);
//   };

//   const deleteItem = (path) => {
//     const newData = [...data];
//     let current = newData;

//     path.forEach((p, i) => {
//       if (i === path.length - 1) {
//         current.splice(p, 1);
//       } else {
//         current = current[p].options;
//       }
//     });

//     setData(newData);
//     console.log("Deleted Item:", newData);
//   };

//   const generateJSON = () => {
//     console.log(JSON.stringify(data, null, 2));
//   };

//   const openModal = (path) => {
//     setModalPath(path);
//     setModalText("");
//     setModalHasComment(false);
//     setModalOpen(true);
//   };

//   const handleModalSubmit = () => {
//     const newData = [...data];
//     let current = newData;

//     modalPath.forEach((p, i) => {
//       if (i === modalPath.length - 1) {
//         current[p].options.push({
//           id: Date.now(),
//           text: modalText,
//           has_comment: modalHasComment,
//           options: [],
//         });
//       } else {
//         current = current[p].options;
//       }
//     });

//     setData(newData);
//     setModalOpen(false);
//     console.log("Modal Submit:", newData);
//   };

//   const renderOptions = (options, path) => {
//     return options.map((item, index) => (
//       <Box
//         key={item.id}
//         ml={4}
//         mt={2}
//         component={Paper}
//         p={2}>
//         <TextField
//           label="Text"
//           value={item.text}
//           onChange={(e) => handleTextChange([...path, index], e.target.value)}
//           fullWidth
//           margin="normal"
//         />
//         <Box
//           display="flex"
//           alignItems="center">
//           <Checkbox
//             checked={item.has_comment}
//             onChange={(e) =>
//               handleCheckboxChange([...path, index], e.target.checked)
//             }
//           />
//           <Typography>Has Comment</Typography>
//         </Box>
//         <Box
//           display="flex"
//           alignItems="center">
//           <Button
//             startIcon={<AddIcon />}
//             onClick={() => openModal([...path, index])}>
//             Add Sub Option
//           </Button>
//           <IconButton onClick={() => deleteItem([...path, index])}>
//             <DeleteIcon />
//           </IconButton>
//         </Box>
//         {item.options &&
//           item.options.length > 0 &&
//           renderOptions(item.options, [...path, index])}
//       </Box>
//     ));
//   };

//   return (
//     <Container>
//       <Box mb={2}>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={addPrimaryDropdown}>
//           Add Primary Dropdown
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           onClick={generateJSON}
//           style={{ marginLeft: 8 }}>
//           Generate JSON
//         </Button>
//       </Box>
//       {data.map((item, index) => (
//         <Box
//           key={item.id}
//           mt={2}
//           component={Paper}
//           p={2}>
//           <TextField
//             label="Text"
//             value={item.text}
//             onChange={(e) => handleTextChange([index], e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Box
//             display="flex"
//             alignItems="center">
//             <Checkbox
//               checked={item.has_comment}
//               onChange={(e) => handleCheckboxChange([index], e.target.checked)}
//             />
//             <Typography>Has Comment</Typography>
//           </Box>
//           <Box
//             display="flex"
//             alignItems="center">
//             <Button
//               startIcon={<AddIcon />}
//               onClick={() => openModal([index])}>
//               Add Sub Option
//             </Button>
//             <IconButton onClick={() => deleteItem([index])}>
//               <DeleteIcon />
//             </IconButton>
//           </Box>
//           {item.options &&
//             item.options.length > 0 &&
//             renderOptions(item.options, [index])}
//         </Box>
//       ))}

//       <Modal
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}>
//         <Box
//           position="absolute"
//           top="50%"
//           left="50%"
//           transform="translate(-50%, -50%)"
//           bgcolor="background.paper"
//           p={4}
//           boxShadow={24}>
//           <Typography
//             variant="h6"
//             mb={2}>
//             Add Sub Option
//           </Typography>
//           <TextField
//             label="Text"
//             value={modalText}
//             onChange={(e) => setModalText(e.target.value)}
//             fullWidth
//             margin="normal"
//           />
//           <Box
//             display="flex"
//             alignItems="center"
//             mb={2}>
//             <Checkbox
//               checked={modalHasComment}
//               onChange={(e) => setModalHasComment(e.target.checked)}
//             />
//             <Typography>Has Comment</Typography>
//           </Box>
//           <Box
//             display="flex"
//             justifyContent="space-between">
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleModalSubmit}>
//               Add
//             </Button>
//             <Button
//               variant="contained"
//               color="secondary"
//               onClick={() => setModalOpen(false)}>
//               Cancel
//             </Button>
//           </Box>
//         </Box>
//       </Modal>
//     </Container>
//   );
// };

// export default ParentComponent;


// /** @format */

// import { AddCircleTwoTone, RemoveCircleTwoTone } from "@mui/icons-material";
// import {
//   Box,
//   Dialog,
//   DialogTitle,
//   FormControl,
//   TextField,
//   Typography,
//   IconButton,
//   Checkbox,
//   FormControlLabel,
//   Button,
//   DialogActions,
//   Switch,
// } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import QuestionPopUp from "./QuestionPopUp";

// const EditQuestion = ({ question, open, setOpen }) => {
//   const [isShortAnswer, setIsShortAnswer] = useState(true);
//   const [options, setOptions] = useState([
//     {
//       id: 1,
//       text: "",
//       comments: false,
//       sublist: [],
//     },
//   ]);
//   const [openModals, setOpenModals] = useState([]);
//   const [desp, setDesp] = useState({
//     primary_breakdown: [],
//   });

//   const handleOpenNext = (option) => {
//     setOpenModals((prev) => [...prev, {
//       option
//     }]);
//   };

//   const handleAddOption = () => {
//     setOptions([
//       ...options,
//       {
//         id: options.length + 1,
//         text: "",
//         comments: false,
//         sublist: [],
//       },
//     ]);
//   };

//   const handleRemoveOption = (index) => {
//     const newOptions = options.filter((_, i) => i !== index);
//     setOptions(newOptions);
//   };

//   const handleOptionChange = (index, key, value) => {
//     const newOptions = options.map((option, i) =>
//       i === index ? { ...option, [key]: value } : option
//     );
//     setOptions(newOptions);
//   };

//   const handleCloseModal = () => {
//     setOpen(false);
//   };

//   const addQuestion = (value) => {
//     setDesp({
//       ...desp,
//       questionText: {
//         flag: true,
//         text: value,
//       },
//     });
//     console.log(desp);
//   };

//   const saveData = () => {
//     const transformedData = {
//       primary_breakdown: options,
//     };
//     setDesp(transformedData);
//     console.log(transformedData);
//   };

//   useEffect(() => {
//     console.log(options);
//   }, [options]);

//   return (
//     <Dialog
//       open={open}
//       onClose={handleCloseModal}>
//       <DialogTitle
//         sx={{ display: "flex", flexDirection: "column", gap: "1vw" }}>
//         <Typography variant="h4">{question.tag}</Typography>
//         <FormControl>
//           <FormControlLabel
//             control={
//               <Checkbox
//                 checked={isShortAnswer}
//                 color="success"
//                 onChange={() => {
//                   setIsShortAnswer(!isShortAnswer);
//                   setDesp({
//                     ...desp,
//                     questionText: {
//                       flag: !desp.questionText?.flag,
//                     },
//                   });
//                 }}
//               />
//             }
//             label="Question"
//           />
//         </FormControl>
//         {isShortAnswer && (
//           <TextField
//             fullWidth
//             value={desp.questionText?.text || ""}
//             onChange={(e) => addQuestion(e.target.value)}
//             placeholder="Question text"
//             size="small"
//           />
//         )}
//         <Box
//           sx={{ cursor: "pointer" }}
//           onClick={() => handleAddOption()}>
//           <IconButton>
//             <AddCircleTwoTone />
//           </IconButton>
//           Add Option
//         </Box>
//         <FormControl>
//           <Box
//             display="flex"
//             flexDirection="column"
//             gap={1}>
//             {options.map((option, index) => (
//               <Box
//                 key={index}
//                 display="flex"
//                 flexDirection={"column"}
//                 gap={0}>
//                 <Box
//                   display="flex"
//                   gap={1}>
//                   <TextField
//                     fullWidth
//                     value={option.text}
//                     onChange={(e) =>
//                       handleOptionChange(index, "text", e.target.value)
//                     }
//                     placeholder="Option text"
//                     size="small"
//                   />
//                   <IconButton
//                     size="small"
//                     onClick={() => handleAddOption(index)}>
//                     <AddCircleTwoTone />
//                   </IconButton>
//                   <IconButton
//                     size="small"
//                     onClick={() => handleRemoveOption(index)}>
//                     <RemoveCircleTwoTone />
//                   </IconButton>
//                 </Box>
//                 <Box
//                   display="flex"
//                   alignItems="center"
//                   mt={1}
//                   gap={1}
//                   sx={{ cursor: "pointer" }}>
//                   <Box onClick={handleOpenNext}>
//                     <IconButton
//                       size="small"
//                       sx={{ padding: 0.5 }}>
//                       <AddCircleTwoTone sx={{ fontSize: 14 }} />
//                     </IconButton>
//                     <Typography
//                       component="span"
//                       sx={{ fontSize: 10 }}>
//                       Add sub Options
//                     </Typography>
//                   </Box>
//                   <Box sx={{ display: "flex", gap: "0", alignItems: "center" }}>
//                     <Switch
//                       color="info"
//                       size="small"
//                       checked={option.comments}
//                       onChange={(e) =>
//                         handleOptionChange(index, "comments", e.target.checked)
//                       }
//                     />
//                     <Typography
//                       component="span"
//                       sx={{ fontSize: 10 }}>
//                       Add Comments
//                     </Typography>
//                   </Box>
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </FormControl>
//       </DialogTitle>
//       <DialogActions>
//         <Button
//           onClick={handleCloseModal}
//           variant="contained"
//           color="primary">
//           Cancel
//         </Button>
//         <Button
//           onClick={saveData}
//           variant="contained"
//           color="primary">
//           Save
//         </Button>
//       </DialogActions>
//       <QuestionPopUp
//         openModals={openModals}
//         setOpenModals={setOpenModals}
//         handleOpenNext={handleOpenNext}
//       />
//     </Dialog>
//   );
// };

// export default EditQuestion;
