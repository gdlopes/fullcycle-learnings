package graph

import "github.com/gdlopes/fullcycle-go-graphql-learning/internal/database"

type Resolver struct{
	CategoryDB *database.Category
	CourseDB *database.Course
}
