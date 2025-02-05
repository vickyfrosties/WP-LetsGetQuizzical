const Game: React.FC = () => {

    const handleClick = () => {
        console.log("bouton fonctionne");
    };

    return (
        <>
            <button onClick={handleClick}>Commencer le quiz</button>
        </>
    );
};

export default Game;