module.exports = {
	get: {
		tags: ["EDT requests"],
		description: "Get the EDT of a group ID",
		operationId: "getEDT",
		parameters: [
			{
				name: "id",
				in: "path",
				description: "ID of the group",
				required: true,
				type: "integer"
			},
			{
				name: "weeks",
				in: "query",
				required: false,
				schema: {
					$ref: "#/components/schemas/weeks"
				}
			},
			{
				name: "days",
				in: "query",
				required: false,
				schema: {
					$ref: "#/components/schemas/days"
				}
			},
			{
				name: "height",
				in: "query",
				required: false,
				type: "integer",
				description: "Height of the EDT"
			},
			{
				name: "width",
				in: "query",
				required: false,
				type: "integer",
				description: "Width of the EDT"
			}
		],
		responses: {
			200: {
				description: "EDT image",
				content: {
					"application/json": {
						schema: {
							$ref: "#/components/schemas/edt",
						}
					}
				}
			}
		}
	}
};