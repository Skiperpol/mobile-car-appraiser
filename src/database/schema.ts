import { appSchema, tableSchema } from "@nozbe/watermelondb";

// DODANO NAME DO ATTACHMENTÓW

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "reports",
      columns: [
        { name: "report_number", type: "string", isIndexed: true },
        { name: "user_id", type: "string", isIndexed: true },
        { name: "order_id", type: "string", isOptional: true },
        { name: "image_url", type: "string", isOptional: true },
        { name: "image_name", type: "string", isOptional: true },
        { name: "created_at", type: "number", isIndexed: true },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "basic_data",
      columns: [
        { name: "report_id", type: "string", isIndexed: true },
        { name: "brand", type: "string", isOptional: true },
        { name: "model", type: "string", isOptional: true },
        { name: "vin", type: "string", isOptional: true },
        { name: "registration_number", type: "string", isOptional: true },
        { name: "production_year", type: "number", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "report_fields_config",
      columns: [
        { name: "label", type: "string" },
        { name: "field_type", type: "string" },
        { name: "example_value", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "report_dynamic_values",
      columns: [
        { name: "report_id", type: "string", isIndexed: true },
        { name: "field_id", type: "string", isIndexed: true },
        { name: "value", type: "string" },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
    tableSchema({
      name: "report_attachments",
      columns: [
        { name: "report_id", type: "string", isIndexed: true },
        { name: "url", type: "string" },
        { name: "comment", type: "string", isOptional: true },
        { name: "name", type: "string", isOptional: true },
        { name: "created_at", type: "number" },
        { name: "updated_at", type: "number" },
      ],
    }),
  ],
});
