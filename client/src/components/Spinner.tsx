const Spinner = ({ color = "#3b82f6", size = 40 }) => {
	return (
		<div className={"flex items-center justify-center w-full h-[300px] py-8 "}>
			<svg
				width={size}
				height={size}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				className="animate-spin"
			>
				<title>spinner</title>
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke={color}
					strokeWidth="2"
					fill="none"
					strokeDasharray="31.4 31.4"
					strokeLinecap="round"
				/>
			</svg>
		</div>
	);
};

export default Spinner;
