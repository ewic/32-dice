export default function PieceView({ piece }: any) {
    const style = {}

    return (
        <div>
            <span style={style}>{piece != null ? piece.getValue() : null}</span>
        </div>
    )
}