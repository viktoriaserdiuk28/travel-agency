function Button({
  textColor,
  bgColor,
  onClick,
  height,
  width,
  children,
  fontSize,
  borderRadius,
  fontWeight,
  className,
  fontFamily,
  border,
}) {
  return (
    <>
      <button
        className={className}
        style={{
          backgroundColor: bgColor,
          color: textColor,
          height: height,
          width: width,
          fontSize: fontSize,
          borderRadius: borderRadius,
          fontWeight: fontWeight,
          fontFamily: fontFamily,
          border: border,
        }}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
}

export default Button;
