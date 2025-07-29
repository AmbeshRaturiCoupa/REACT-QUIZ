function FinishScreen({ points, maxPossiblePoints, dispatch }) {
    return (
        <>
      <p className="result">
        <span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}
        </span>
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart quiz
      </button>
    </>
    )
}

export default FinishScreen
