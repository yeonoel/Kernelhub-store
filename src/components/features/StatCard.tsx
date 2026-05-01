import { Card, CardContent } from "../ui/card";

interface StatCardProps {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBgColor: string;
    iconLabel?: string;
}

export const StatCard = ({ title, value, icon, iconBgColor, iconLabel }: StatCardProps) => {
    return (
        <Card className="border-gray-200">
            <CardContent className="px-4 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        {iconLabel && (
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest block">
                                {iconLabel}
                            </span>
                        )}
                        <p className="text-xl font-bold text-gray-900 leading-tight">{value}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{title}</p>
                    </div>
                    <div className={`w-7 h-7 rounded-md ${iconBgColor} flex items-center justify-center`}>
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
