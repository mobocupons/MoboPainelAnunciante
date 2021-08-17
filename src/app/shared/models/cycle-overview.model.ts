export class Chart {
    startDate: Date;
    endDate: Date;
    value: number;
}

export class Position {
    label: string;
    chart: Chart[];
    color?: string;
    isVisible?: boolean;
}

export class CycleOverview {
    data: Position[];
}