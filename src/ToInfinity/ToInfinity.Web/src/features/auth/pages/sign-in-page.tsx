import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import authWeddingImg from "../../../assets/auth-wedding.jpg";
import { handleGoogleLogin } from "../api/google-auth";
import { useLogin } from "../hooks/use-login";
import { signInSchema, type SignInFormData } from "../schemas";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { mutate: login, isPending } = useLogin({
    config: {
      onSuccess: () => {
        setSuccess(true);
      },
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: SignInFormData) => {
    login({ email: data.email, password: data.password });
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      await handleGoogleLogin("/");
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        position: "relative",
      }}
    >
      {/* Success Overlay */}
      <Fade in={success}>
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: success ? "flex" : "none",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "background.paper",
          }}
        >
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              bgcolor: "rgba(196, 114, 78, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 2,
            }}
          >
            <FavoriteIcon sx={{ color: "secondary.main", fontSize: 28 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "text.primary",
              mb: 0.5,
            }}
          >
            Welcome back!
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
            Redirecting to your dashboard...
          </Typography>
          <CircularProgress
            size={20}
            sx={{ mt: 2, color: "secondary.main" }}
          />
        </Box>
      </Fade>

      {/* Left side - Image panel */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: "45%",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `url(${authWeddingImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(42, 31, 24, 0.7) 0%, rgba(42, 31, 24, 0.2) 50%, transparent 100%)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            p: { md: 5, lg: 6 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              color: "#fff",
              fontWeight: 700,
              mb: 1.5,
              lineHeight: 1.2,
            }}
          >
            Your dream wedding starts here
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: 380,
            }}
          >
            Discover stunning venues and exceptional catering services to make
            your special day unforgettable.
          </Typography>
        </Box>
      </Box>

      {/* Right side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, sm: 6, md: 8 },
          py: { xs: 5, md: 6 },
          bgcolor: "background.paper",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 420 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              mb: 5,
            }}
          >
            <FavoriteIcon sx={{ color: "secondary.main", fontSize: 26 }} />
            <Typography
              variant="h6"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "primary.main",
                fontSize: "1.3rem",
              }}
            >
              TooInfinity
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            variant="h4"
            sx={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              color: "text.primary",
              mb: 0.5,
              fontSize: { xs: "1.6rem", md: "1.85rem" },
            }}
          >
            Welcome back
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 4,
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            Sign in to your account to continue planning your perfect day.
          </Typography>

          {/* Google Sign In */}
          <Button
            fullWidth
            variant="outlined"
            disabled={isPending || googleLoading}
            startIcon={
              googleLoading ? (
                <CircularProgress size={18} sx={{ color: "secondary.main" }} />
              ) : (
                <GoogleIcon />
              )
            }
            onClick={handleGoogleSignIn}
            sx={{
              py: 1.4,
              mb: 3,
              borderColor: "rgba(61, 47, 37, 0.2)",
              color: "text.primary",
              fontWeight: 500,
              fontSize: "0.95rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                borderColor: "secondary.main",
                bgcolor: "rgba(196, 114, 78, 0.04)",
              },
              "&:disabled": {
                borderColor: "rgba(61, 47, 37, 0.1)",
              },
            }}
          >
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </Button>

          {/* Divider */}
          <Divider
            sx={{
              mb: 3,
              "&::before, &::after": {
                borderColor: "rgba(61, 47, 37, 0.12)",
              },
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: "0.82rem",
                px: 2,
              }}
            >
              or sign in with email
            </Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Typography
              component="label"
              htmlFor="email"
              sx={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              Email address
            </Typography>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  fullWidth
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    mb: 2.5,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "background.default",
                      "& fieldset": {
                        borderColor: errors.email
                          ? "error.main"
                          : "rgba(61, 47, 37, 0.15)",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.email
                          ? "error.main"
                          : "rgba(196, 114, 78, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.email
                          ? "error.main"
                          : "secondary.main",
                        borderWidth: 1.5,
                      },
                    },
                    "& .MuiInputBase-input": {
                      py: 1.3,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              )}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 0.5,
              }}
            >
              <Typography
                component="label"
                htmlFor="password"
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                Password
              </Typography>
              <RouterLink
                to="/forgot-password"
                style={{
                  fontSize: "0.82rem",
                  color: "#c4724e",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                Forgot password?
              </RouterLink>
            </Box>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  fullWidth
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                          size="small"
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <VisibilityOffIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                          ) : (
                            <VisibilityIcon
                              sx={{ fontSize: 20, color: "text.secondary" }}
                            />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                      bgcolor: "background.default",
                      "& fieldset": {
                        borderColor: errors.password
                          ? "error.main"
                          : "rgba(61, 47, 37, 0.15)",
                      },
                      "&:hover fieldset": {
                        borderColor: errors.password
                          ? "error.main"
                          : "rgba(196, 114, 78, 0.4)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: errors.password
                          ? "error.main"
                          : "secondary.main",
                        borderWidth: 1.5,
                      },
                    },
                    "& .MuiInputBase-input": {
                      py: 1.3,
                      fontSize: "0.95rem",
                    },
                  }}
                />
              )}
            />

            <Controller
              name="rememberMe"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      size="small"
                      sx={{
                        color: "rgba(61, 47, 37, 0.3)",
                        "&.Mui-checked": { color: "secondary.main" },
                      }}
                    />
                  }
                  label={
                    <Typography
                      sx={{ fontSize: "0.85rem", color: "text.secondary" }}
                    >
                      Remember me for 30 days
                    </Typography>
                  }
                  sx={{ mb: 3 }}
                />
              )}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isPending}
              startIcon={
                isPending ? (
                  <CircularProgress size={18} sx={{ color: "#fff" }} />
                ) : undefined
              }
              sx={{
                py: 1.4,
                bgcolor: "secondary.main",
                color: "#fff",
                fontWeight: 600,
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 2,
                boxShadow: "0 2px 8px rgba(196, 114, 78, 0.3)",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  boxShadow: "0 4px 12px rgba(196, 114, 78, 0.4)",
                },
                "&:disabled": {
                  bgcolor: "rgba(196, 114, 78, 0.5)",
                  color: "#fff",
                },
              }}
            >
              {isPending ? "Signing in..." : "Sign In"}
            </Button>
          </Box>

          {/* Footer */}
          <Typography
            sx={{
              mt: 4,
              textAlign: "center",
              fontSize: "0.9rem",
              color: "text.secondary",
            }}
          >
            {"Don't have an account? "}
            <RouterLink
              to="/auth/signup"
              style={{
                color: "#c4724e",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign up for free
            </RouterLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
