module.exports = {
	components: {
		schemas: {
			group: {
				type: "object",
				properties: {
					id: { type: "integer" },
					name: { type: "string" },
					children: {
						type: "array",
						$ref: "#/components/schemas/group"
					}
				}
			},
			search: {
				type: "string",
				description: "Search filter",
				example: "search1;search2;search3"
			},
			type: {
				type: "string",
				description: "Type of the ID (class = no children)",
				enum: ["group", "class"]
			},
			edt: {
				type: "string",
				description: "Url of the EDT"
			},
			weeks: {
				type: "integer",
				description: "Week in advance to be displayed"
			},
			days: {
				type: "string",
				description: "Days of the week to display [0-6]",
				example: "0,1,2,3,4"
			},
			error: {
				type: "object",
				properties: {
					status: {
						type: "string",
						description: "Error status",
						example: "error",
					},
					message: {
						type: "string",
						description: "Error message",
						example: "Unknown group",
					}
				}
			}
		}
	}
};