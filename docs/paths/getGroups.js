module.exports = {
	get: {
		tags: ["Groups requests"],
		description: "Get groups (search for groups)",
		operationId: "getGroups",
		parameters: [
			{
				name: "search",
				in: "query",
				required: false,
				schema: {
					$ref: "#/components/schemas/search"
				}
			},
			{
				name: "type",
				in: "query",
				required: false,
				schema: {
					$ref: "#/components/schemas/type"
				}
			}
		],
		responses: {
			200: {
				description: "List of groups",
				content: {
					"application/json": {
						schema: {
							type: "array",
							items: {
								$ref: "#/components/schemas/group"
							}
						}
					}
				}
			}
		}
	}
};