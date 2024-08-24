import { Metadata } from "next";

export const metadata: Metadata = {
	title: "REM'S License Terms",
	description: "You are free to host your own instance, modify it, fork it and contribute as long as you follow the license terms.",
	formatDetection: {
		telephone: false,
		date: false,
		address: false,
		email: false,
		url: false
	}
};

export default function Legal() {

	const cy = (new Date()).getFullYear()

	let wtf = ` - ${cy}`

	if (cy===2024) {
		wtf = " - present"
	}

	return (
        <div className="py-16 px-32 text-muted-foreground text-lg">
			<div className="text-black text-3xl">The REM Remote Admin.</div>
			<br/>
			{"This is a FOSS revival of RoControl, and many other Roblox Remote Admins, written in TypeScript. You are free to host your own instance, modify it, fork it and contribute as long as you follow the license terms."}
			<br/>
			<br/>
			
			<>
				<div>
					<span className="text-black text-xl">BSD 3-Clause license</span>{"    "}
					<span className="text-sm">Copyright (c) OCbwoy3, 2024{wtf}</span>
				</div>
				
				<br/>
				{"Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:"}
				<br/>
				<br/>

				<ol>
					<li><b className="font-mono">1.</b>{"  Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer."}</li>
					<li><b className="font-mono">2.</b>{"  Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution."}</li>
					<li><b className="font-mono">3.</b>{"  Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission."}</li>
				</ol>

				<br/>
				<div className="text-xs">
					{"THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS \"AS IS\" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE."}
				</div>
			</>
		</div>
	)
}