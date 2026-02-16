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
import FormHelperText from "@mui/material/FormHelperText";
import LinearProgress from "@mui/material/LinearProgress";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import authWeddingImg from "../../../assets/auth-wedding.jpg";
import { handleGoogleLogin } from "../api/google-auth";
import { useRegister } from "../hooks/use-register";
import { signUpSchema, type SignUpFormData } from "../schemas";

function getPasswordStrength(password: string) {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
}

function strengthLabel(score: number) {
  if (score <= 1) return { label: "Weak", color: "#d32f2f" };
  if (score <= 2) return { label: "Fair", color: "#ed6c02" };
  if (score <= 3) return { label: "Good", color: "#c4724e" };
  return { label: "Strong", color: "#2e7d32" };
}

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { mutate: register, isPending } = useRegister({
    config: {
      onSuccess: () => {
        setSuccess(true);
      },
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      agreeTerms: false,
    },
  });

  const password = watch("password");
  const strength = getPasswordStrength(password || "");
  const { label: strengthText, color: strengthColor } = strengthLabel(strength);

  const onSubmit = (data: SignUpFormData) => {
    register({
      email: data.email,
      password: data.password,
      confirmPassword: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      await handleGoogleLogin("/");
    } finally {
      setGoogleLoading(false);
    }
  };

  const fieldSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      bgcolor: "background.default",
      "& fieldset": {
        borderColor: "rgba(61, 47, 37, 0.15)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(196, 114, 78, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: "secondary.main",
        borderWidth: 1.5,
      },
    },
    "& .MuiInputBase-input": {
      py: 1.3,
      fontSize: "0.95rem",
    },
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
            Account created successfully!
          </Typography>
          <Typography sx={{ color: "text.secondary", fontSize: "0.95rem" }}>
            Redirecting to your dashboard...
          </Typography>
          <CircularProgress size={20} sx={{ mt: 2, color: "secondary.main" }} />
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
            Begin your forever
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "1.05rem",
              lineHeight: 1.6,
              maxWidth: 380,
            }}
          >
            Join thousands of couples who found their perfect venue and catering
            through TooInfinity.
          </Typography>

          {/* Social proof */}
          <Box sx={{ mt: 3, display: "flex", gap: 4 }}>
            {[
              { num: "2,500+", text: "Venues" },
              { num: "1,200+", text: "Caterers" },
              { num: "10k+", text: "Happy Couples" },
            ].map((stat) => (
              <Box key={stat.text}>
                <Typography
                  sx={{
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: "1.2rem",
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {stat.num}
                </Typography>
                <Typography
                  sx={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: "0.8rem",
                  }}
                >
                  {stat.text}
                </Typography>
              </Box>
            ))}
          </Box>
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
          py: { xs: 5, md: 5 },
          bgcolor: "background.paper",
          overflowY: "auto",
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 440 }}>
          {/* Logo */}
          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              textDecoration: "none",
              mb: 4,
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
            Create your account
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              mb: 3.5,
              fontSize: "0.95rem",
              lineHeight: 1.5,
            }}
          >
            Start planning the wedding of your dreams today.
          </Typography>

          {/* Google Sign Up */}
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
            onClick={handleGoogleSignUp}
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
              or sign up with email
            </Typography>
          </Divider>

          {/* Form */}
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Name row */}
            <Box sx={{ display: "flex", gap: 2, mb: 2.5 }}>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="label"
                  htmlFor="firstName"
                  sx={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  First name
                </Typography>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="firstName"
                      placeholder="Jane"
                      fullWidth
                      size="small"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={fieldSx}
                    />
                  )}
                />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography
                  component="label"
                  htmlFor="lastName"
                  sx={{
                    display: "block",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "text.primary",
                    mb: 0.5,
                  }}
                >
                  Last name
                </Typography>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      id="lastName"
                      placeholder="Doe"
                      fullWidth
                      size="small"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={fieldSx}
                    />
                  )}
                />
              </Box>
            </Box>

            {/* Email */}
            <Typography
              component="label"
              htmlFor="signupEmail"
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
                  id="signupEmail"
                  type="email"
                  placeholder="you@example.com"
                  fullWidth
                  size="small"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ ...fieldSx, mb: 2.5 }}
                />
              )}
            />

            {/* Password */}
            <Typography
              component="label"
              htmlFor="signupPassword"
              sx={{
                display: "block",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "text.primary",
                mb: 0.5,
              }}
            >
              Password
            </Typography>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  id="signupPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
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
                  sx={{ ...fieldSx, mb: 1 }}
                />
              )}
            />

            {/* Password strength meter */}
            {(password?.length ?? 0) > 0 && (
              <Box sx={{ mb: 2.5 }}>
                <LinearProgress
                  variant="determinate"
                  value={(strength / 5) * 100}
                  sx={{
                    height: 4,
                    borderRadius: 2,
                    bgcolor: "rgba(61, 47, 37, 0.08)",
                    mb: 0.8,
                    "& .MuiLinearProgress-bar": {
                      bgcolor: strengthColor,
                      borderRadius: 2,
                    },
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "0.78rem",
                      color: strengthColor,
                      fontWeight: 600,
                    }}
                  >
                    {strengthText}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1.5 }}>
                    {[
                      { met: (password?.length ?? 0) >= 8, label: "8+ chars" },
                      { met: /[A-Z]/.test(password || ""), label: "Uppercase" },
                      { met: /[0-9]/.test(password || ""), label: "Number" },
                    ].map((rule) => (
                      <Box
                        key={rule.label}
                        sx={{ display: "flex", alignItems: "center", gap: 0.3 }}
                      >
                        <CheckCircleOutlineIcon
                          sx={{
                            fontSize: 13,
                            color: rule.met ? "#2e7d32" : "rgba(61,47,37,0.2)",
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: "0.72rem",
                            color: rule.met ? "text.primary" : "text.secondary",
                          }}
                        >
                          {rule.label}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}

            {/* Terms */}
            <Controller
              name="agreeTerms"
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
                      sx={{ fontSize: "0.83rem", color: "text.secondary" }}
                    >
                      {"I agree to the "}
                      <RouterLink
                        to="/terms"
                        style={{
                          color: "#c4724e",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        Terms of Service
                      </RouterLink>
                      {" and "}
                      <RouterLink
                        to="/privacy"
                        style={{
                          color: "#c4724e",
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        Privacy Policy
                      </RouterLink>
                    </Typography>
                  }
                  sx={{
                    mb: errors.agreeTerms ? 0.5 : 3,
                    alignItems: "flex-start",
                    mt: -0.5,
                  }}
                />
              )}
            />
            {errors.agreeTerms && (
              <FormHelperText error sx={{ mt: -2, mb: 2.5 }}>
                {errors.agreeTerms.message}
              </FormHelperText>
            )}

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
              {isPending ? "Creating account..." : "Sign Up"}
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
            Already have an account?{" "}
            <RouterLink
              to="/auth/signin"
              style={{
                color: "#c4724e",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
            </RouterLink>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
