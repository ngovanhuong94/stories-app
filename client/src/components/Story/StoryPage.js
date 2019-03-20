import React from 'react'


const StoryPage = () => (
	<div className="Home">
		<div className="center story">
			<img 
				src="https://res.cloudinary.com/dzlwpwzr9/image/upload/v1522347891/Santorini_hwczai.jpg"
				alt=""
			/>
			<div className="story-header">
				<h2>My test title here</h2>
				<h5>my category</h5>
				<p>
					Created by <strong>huong</strong>
				</p>
				<p>
					10 <strong className="heart-icon">&#9825;</strong>
				</p>
			</div>

			<blockquote className="story-description">
					is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book
			</blockquote>
			<div className="story-text">
					"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
					vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
			</div>
		</div>	
	</div>
)


export default StoryPage