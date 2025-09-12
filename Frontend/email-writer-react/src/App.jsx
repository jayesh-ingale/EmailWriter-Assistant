import {
  Container,
  Typography,
  Box,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Button,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [emailContent, setEmailContent] = useState("");
  const [tone, setTone] = useState("");
  const [length, setLength] = useState("");
  const [generatedReply, setGeneratedReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (action = "generate") => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:8080/api/email/generate", {
        emailContent,
        tone,
        length,
        action,
      });
      setGeneratedReply(
        typeof response.data === "string"
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      setError("⚠️ Failed to generate email reply. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8fafc, #eef2ff)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        {/* Hero Section */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: "bold",
            textAlign: "center",
            mb: 2,
            background: "linear-gradient(90deg, #6366f1, #3b82f6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ✨ Smart Email Reply Generator
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ textAlign: "center", mb: 5, color: "text.secondary" }}
        >
          Generate AI-powered replies instantly. Save time and reply with confidence.
        </Typography>

        {/* Card Form */}
        <Card
          sx={{
            p: 3,
            borderRadius: 3,
            boxShadow: 4,
            bgcolor: "white",
          }}
        >
          <CardContent>
            <TextField
              fullWidth
              multiline
              rows={6}
              variant="outlined"
              label="📧 Original Email Content"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Tone</InputLabel>
              <Select
                value={tone}
                label="Tone"
                onChange={(e) => setTone(e.target.value)}
              >
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Reply Length</InputLabel>
              <Select
                value={length}
                label="Reply Length"
                onChange={(e) => setLength(e.target.value)}
              >
                <MenuItem value="short">Short</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="detailed">Detailed</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              size="large"
              onClick={() => handleSubmit("generate")}
              disabled={!emailContent || loading}
              fullWidth
              sx={{
                py: 1.5,
                fontSize: "1rem",
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "none",
              }}
            >
              {loading ? <CircularProgress size={24} /> : "🚀 Generate Reply"}
            </Button>
          </CardContent>
        </Card>

        {/* Error Handling */}
        {error && (
          <Typography color="error" sx={{ mt: 3, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {/* Generated Reply Section */}
        {generatedReply && (
          <Card
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 3,
              boxShadow: 2,
              bgcolor: "#f9fafb",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                ✉️ Generated Reply
              </Typography>
              <Box sx={{ position: "relative" }}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={generatedReply}
                  inputProps={{ readOnly: true }}
                />
                <IconButton
                  onClick={() => navigator.clipboard.writeText(generatedReply)}
                  sx={{ position: "absolute", top: 8, right: 8 }}
                >
                  <ContentCopyIcon />
                </IconButton>
              </Box>

              <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmit("regenerate")}
                >
                  🔄 Regenerate
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmit("refine")}
                >
                  ✨ Refine
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => handleSubmit("improveTone")}
                >
                  🎭 Improve Tone
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </Box>
  );
};

export default App;



// import { useState } from 'react'
// import './App.css'
// import { Box, Button, CircularProgress, Container, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
// import axios from 'axios';

// function App() {
//   const [emailContent, setEmailContent] = useState('');
//   const [tone, setTone] = useState('');
//   const [generatedReply, setGeneratedReply] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const response = await axios.post("http://localhost:8080/api/email/generate", {
//        emailContent,
//        tone 
//       });
//       setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
//     } catch (error) {
//       setError('Failed to generate eamil reply. Please try again');
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Container maxWidth="md" sx={{py:4}}>
//       <Typography variant='h3' component="h1" gutterBottom>
//         Email Reply Generator
//       </Typography>

//       <Box sx={{ mx: 3 }}>
//         <TextField 
//           fullWidth
//           multiline
//           rows={6}
//           variant='outlined'
//           label="Original Email Content"
//           value={emailContent || ''}
//           onChange={(e) => setEmailContent(e.target.value)}
//           sx={{ mb:2 }}/>

//           <FormControl fullWidth sx={{ mb:2 }}>
//             <InputLabel>Tone (Optional)</InputLabel>
//             <Select
//               value={tone || ''}
//               label={"Tone (Optional)"}
//               onChange={(e) => setTone(e.target.value)}>
//                 <MenuItem value="">None</MenuItem>
//                 <MenuItem value="professional">Professional</MenuItem>
//                 <MenuItem value="casual">Casual</MenuItem>
//                 <MenuItem value="friendly">Friendly</MenuItem>
//             </Select>
//           </FormControl>

//           <Button
//             variant='contained'
//             onClick={handleSubmit}
//             disabled={!emailContent || loading}
//             fullWidth>
//             {loading ? <CircularProgress size={24}/> : "Generate Reply"}
//           </Button>
//       </Box>

//       {error && (
//         <Typography color='error' sx={{ mb:2 }}>
//           {error}
//         </Typography>
//       )}

//       {generatedReply && (
//        <Box sx={{ mt: 3}}>
//           <Typography variant='h6' gutterBottom>
//             Generated Reply:
//           </Typography>
//           <TextField
//             fullWidth
//             multiline
//             rows={6}
//             variant='outlined'
//             value={generatedReply || ''}
//             inputProps={{ readOnly: true }}/>
        
//         <Button
//           variant='outlined'
//           sx={{ mt: 2 }}
//           onClick={() => navigator.clipboard.writeText(generatedReply)}>
//             Copy to Clipboard
//         </Button>
//        </Box> 
//       )}
//     </Container>
//   )
// }

// export default App