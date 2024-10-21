export default function TestErrorPage() {
	throw new Error('oops!')
	return <div>You should not see this</div>
}