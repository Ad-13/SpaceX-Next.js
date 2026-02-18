"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Form } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Input from "@/shared/ui/Input";
import Select from "@/shared/ui/Select";
import Button from "@/shared/ui/Button";
import {
  launchesFiltersSchema,
  LaunchesFiltersFormValues,
} from "./schema";
import { UPCOMING_OPTIONS, SUCCESS_OPTIONS, SORT_BY_OPTIONS, getInitialValues } from "./helper";
import styles from "./LaunchesFilters.module.scss";

export default function LaunchesFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialValues = getInitialValues(searchParams);

  const handleSubmit = (values: LaunchesFiltersFormValues) => {
    const params = new URLSearchParams();

    if (values.name) params.set("name", values.name);
    if (values.upcoming && values.upcoming !== "all")
      params.set("upcoming", values.upcoming);
    if (values.success && values.success !== "all")
      params.set("success", values.success);
    if (values.dateFrom) params.set("dateFrom", values.dateFrom);
    if (values.dateTo) params.set("dateTo", values.dateTo);
    if (values.sortBy) params.set("sortBy", values.sortBy);

    router.push(`/launches?${params.toString()}`);
  };

  const handleReset = () => router.push("/launches");

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(launchesFiltersSchema)}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      <Form className={styles.form}>
        <div className={styles.row}>
          <Input
            name="name"
            label="Search by mission name"
            placeholder="e.g. Starlink, Falcon..."
            className={styles.searchInput}
          />
        </div>

        <div className={styles.row}>
          <Select
            name="upcoming"
            label="Launch Status"
            options={UPCOMING_OPTIONS}
          />
          <Select name="success" label="Outcome" options={SUCCESS_OPTIONS} />
          <Select name="sortBy" label="Sort By" options={SORT_BY_OPTIONS} />
        </div>

        <div className={styles.row}>
          <Input
            name="dateFrom"
            type="date"
            label="From Date"
            className={styles.dateInput}
          />
          <Input
            name="dateTo"
            type="date"
            label="To Date"
            className={styles.dateInput}
          />
        </div>

        <div className={styles.actions}>
          <Button type="submit" variant="primary">
            Apply Filters
          </Button>
          <Button type="button" variant="ghost" onClick={handleReset}>
            Reset
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
