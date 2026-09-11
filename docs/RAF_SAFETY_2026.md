# Animation Frame Safety

Animation-frame loops should stop when the scanner is inactive or the component unmounts. Keep DOM writes bounded and avoid scheduling duplicate loops from repeated state changes.